-- 1. Tabla: seo_systems (Los productos físicos ofrecidos)
CREATE TABLE public.seo_systems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE, 
    name TEXT NOT NULL,        
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla: seo_locations (Jurisdicción Operativa de AL13)
CREATE TABLE public.seo_locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE, 
    name TEXT NOT NULL,        
    department TEXT NOT NULL,  
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Inserción de Seed Data (Estratégico Regional)

-- Sistemas Base (Extraídos 1:1 del Catálogo Real de Templados AL13 + Tendencias Guajira 2026)
INSERT INTO public.seo_systems (slug, name) VALUES
('ventanas-corredizas', 'Ventanas Corredizas y Proyectantes (Sistemas 5020, 744, 8025, 3831)'),
('puertas-aluminio', 'Puertas y Puertas Ventanas en Aluminio (Maderato y Tradicional)'),
('fachadas-vidrio-templado', 'Fachadas Comerciales en Vidrio Templado y Aluminio'),
('cerramientos-arquitectonicos', 'Cerramientos Arquitectónicos en Aluminio y Maderplast'),
('cubiertas-policarbonato', 'Cubiertas en Policarbonato con Estructura en Acero'),
('divisiones-oficina', 'Divisiones de Oficina en Vidrio Laminado Termoacústico'),
('balcones-vidrio', 'Balcones y Barandas en Vidrio Templado'),
-- Modificadores de Alta Intención de Búsqueda Climatológica (Caribe/Guajira)
('ventaneria-termoacustica', 'Ventanería Termoacústica y Aislamiento de Calor'),
('aluminio-antisalitre', 'Fachadas y Perfilería en Aluminio Resistente a Salinidad (Costero)'),
('vidrio-control-solar', 'Instalación de Vidrio Arquitectónico con Control Solar (UV)');

-- Localidades Base (Alcance Logístico AL13)
INSERT INTO public.seo_locations (slug, name, department) VALUES
('riohacha', 'Riohacha', 'La Guajira'),
('maicao', 'Maicao', 'La Guajira'),
('uribia', 'Uribia', 'La Guajira'),
('fonseca', 'Fonseca', 'La Guajira'),
('san-juan-del-cesar', 'San Juan del Cesar', 'La Guajira'),
('valledupar', 'Valledupar', 'Cesar'),
('santa-marta', 'Santa Marta', 'Magdalena');

-- 4. Activación de RLS (Regla de Seguridad: Lectura Pública, Escritura Solo Admin)
ALTER TABLE public.seo_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de sistemas SEO" 
ON public.seo_systems FOR SELECT USING (true);

CREATE POLICY "Lectura pública de locations SEO" 
ON public.seo_locations FOR SELECT USING (true);
