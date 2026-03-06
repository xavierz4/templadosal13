import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// WARNING: Esto requiere la Service Role Key para hacer bypass a las RLS policies de INSERCIÓN.
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("❌ FALTA SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno para el seed.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const MOCKUPS = [
  { file: "01_lumina_frameless_shower_1772427607626.png", title: "Cabina de Ducha Lumina", category: "cabina_ducha", desc: "Sistema sin perfilería aparente para una pureza visual máxima." },
  { file: "02_arcadia_sliding_door_1772427622648.png", title: "Sistema Corredizo Arcadia", category: "divisor_oficina", desc: "Ideal para transiciones ininterrumpidas entre recintos comerciales." },
  { file: "03_apex_pivot_door_1772427637542.png", title: "Puerta Pivotante Frontal Apex", category: "puerta_pivotante", desc: "Ingreso monumental de triple altura con herrajes importados." },
  { file: "04_aura_glass_partition_1772427654507.png", title: "División Comercial Aura", category: "divisor_oficina", desc: "Insonorización acústica (STC 38) con diseño minimalista." },
  { file: "05_zenith_folding_door_1772427686742.png", title: "Sistema Apilable Zenith", category: "puerta_pivotante", desc: "Maximiza la apertura del vano hasta un 90% del espacio libre." },
  { file: "06_horizon_balustrade_1772427706384.png", title: "Baranda Estructural Horizon", category: "fachada_monumental", desc: "Vidrio templado laminado con botón de fijación invisible." },
  { file: "07_vertex_fixed_window_1772427719933.png", title: "Ventanería Monumental Vertex", category: "fachada_monumental", desc: "Cristales Jumbo con alto coeficiente de control solar e índice lumínico." },
  { file: "08_nova_shower_cabin_1772427738978.png", title: "Cabina Nova (Serie Esquinera)", category: "cabina_ducha", desc: "Maximiza la amplitud en espacios arquitectónicos moderados." },
  { file: "09_eclipse_acoustic_door_1772427768192.png", title: "Puerta Acústica Eclipse", category: "puerta_pivotante", desc: "Sello perimetral automatizado para un hermetismo infalible." },
  { file: "10_solstice_skylight_1772427787656.png", title: "Pérgola Acristalada Solstice", category: "fachada_monumental", desc: "Estructura cenital para interiores inundados de luz natural." },
  { file: "11_orion_curtain_wall_1772427847340.png", title: "Fachada Flotante Orion (Curtain Wall)", category: "fachada_monumental", desc: "Solución de piel de vidrio integral para grandes corporativos." },
  { file: "12_vesta_wine_cellar_1772427905345.png", title: "Cava Temperada Vesta", category: "divisor_oficina", desc: "Cristalería cámara doble con tecnología anticondensación." }
];

// Ruta hiper-específica al caché de Brain
const BRAIN_DIR = "C:/Users/xavie/.gemini/antigravity/brain/583fd908-8b36-42d9-b74e-9c843de01868";
const BUCKET_NAME = "catalog-images";

async function main() {
    console.log("🚀 Iniciando Seed B2B de Productos (Task 4.4)...");
    
    // Auto-crear el bucket si no existe (Requiere roles administrativos)
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.find(b => b.name === BUCKET_NAME)) {
        console.log(`🛠️ Creando bucket público [${BUCKET_NAME}]...`);
        await supabase.storage.createBucket(BUCKET_NAME, {
            public: true,
            fileSizeLimit: 15728640, // 15MB
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
        });
    }

    for (const mockup of MOCKUPS) {
        const filePath = path.join(BRAIN_DIR, mockup.file);
        
        if (!fs.existsSync(filePath)) {
            console.error(`⚠️ Archivo local no encontrado: ${filePath} - Omitiendo.`);
            continue;
        }

        console.log(`\n⏳ Procesando [${mockup.title}]...`);
        const fileContent = fs.readFileSync(filePath);
        
        // 1. Upload a Storage
        const cdnPath = `seed/${mockup.file}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(cdnPath, fileContent, {
                contentType: 'image/png',
                upsert: true
            });

        if (uploadError) {
            console.error(`❌ Error Storage en ${mockup.file}:`, uploadError.message);
            continue;
        }

        // 2. Extraer Public URL
        const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(cdnPath);

        // 3. Database Ingestion
        const { error: dbError } = await supabase.from('catalog_projects').insert({
            title: mockup.title,
            category: mockup.category,
            description: mockup.desc,
            image_url: publicUrl,
            image_path: cdnPath,
            is_published: true
        });

        if (dbError) {
            console.error(`❌ Error Base de Datos insertando ${mockup.title}:`, dbError.message);
        } else {
            console.log(`✅ ¡Lote ${mockup.title} migrado exitosamente e insertado en BD! URL: ${publicUrl}`);
        }
    }

    console.log("\n✅💯 SEED COMPLETADO");
}

main().catch(err => {
    console.error("🔥 Error Inesperado:", err);
    process.exit(1);
});
