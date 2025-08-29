-- Test data seeding script for categories, levels, and activities
-- Run this in your Supabase SQL Editor AFTER running the categories_levels_schema.sql

-- 1. Insert test categories
INSERT INTO public.categories (name) VALUES 
  ('Boucles (Loops)'),
  ('Matrices'),
  ('Algorithmes de tri'),
  ('Récursivité'),
  ('Structures de données'),
  ('Complexité algorithmique')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert test levels
INSERT INTO public.levels (name) VALUES 
  ('1ère année'),
  ('2ème année'),
  ('3ème année'),
  ('Bac')
ON CONFLICT (name) DO NOTHING;

-- 3. Get the IDs of categories and levels for reference
-- (You'll need to check these IDs in your Supabase dashboard)

-- 4. Insert test activities with categories and levels
-- Note: Replace the UUIDs below with actual IDs from your categories and levels tables

-- First, let's create a temporary admin user for testing (if not exists)
-- You can skip this if you already have an admin user
DO $$
DECLARE
    admin_user_id UUID;
    loops_category_id UUID;
    matrices_category_id UUID;
    sorting_category_id UUID;
    recursion_category_id UUID;
    data_structures_category_id UUID;
    complexity_category_id UUID;
    level_1_id UUID;
    level_2_id UUID;
    level_3_id UUID;
    bac_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO loops_category_id FROM public.categories WHERE name = 'Boucles (Loops)';
    SELECT id INTO matrices_category_id FROM public.categories WHERE name = 'Matrices';
    SELECT id INTO sorting_category_id FROM public.categories WHERE name = 'Algorithmes de tri';
    SELECT id INTO recursion_category_id FROM public.categories WHERE name = 'Récursivité';
    SELECT id INTO data_structures_category_id FROM public.categories WHERE name = 'Structures de données';
    SELECT id INTO complexity_category_id FROM public.categories WHERE name = 'Complexité algorithmique';
    
    -- Get level IDs
    SELECT id INTO level_1_id FROM public.levels WHERE name = '1ère année';
    SELECT id INTO level_2_id FROM public.levels WHERE name = '2ème année';
    SELECT id INTO level_3_id FROM public.levels WHERE name = '3ème année';
    SELECT id INTO bac_id FROM public.levels WHERE name = 'Bac';
    
    -- Get an admin user ID (first admin user found)
    SELECT id INTO admin_user_id FROM public.students WHERE is_admin = true LIMIT 1;
    
    -- If no admin user exists, we'll use a placeholder
    -- In real scenario, you should have an admin user first
    IF admin_user_id IS NULL THEN
        -- Create a test admin user (you should replace this with your actual admin user)
        INSERT INTO auth.users (id, email) VALUES (gen_random_uuid(), 'test.admin@school.com') 
        ON CONFLICT DO NOTHING;
        
        SELECT id INTO admin_user_id FROM auth.users WHERE email = 'test.admin@school.com';
        
        INSERT INTO public.students (id, email, full_name, is_admin) 
        VALUES (admin_user_id, 'test.admin@school.com', 'Test Admin', true)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Insert test activities
    INSERT INTO public.activities (title, description, content, correction, created_by, category_id, level_id, is_published) VALUES
    
    -- Loops activities
    ('Série 1: Boucles For', 
     'Introduction aux boucles for en programmation', 
     '<h2>Série 1: Boucles For</h2><p><strong>Objectif:</strong> Maîtriser l''utilisation des boucles for</p><h3>Exercice 1:</h3><p>Écrivez un algorithme qui affiche les nombres de 1 à 10</p><h3>Exercice 2:</h3><p>Calculez la somme des nombres de 1 à 100</p>',
     '<h2>Correction - Série 1</h2><p><strong>Exercice 1:</strong></p><pre>Pour i de 1 à 10 faire\n  Afficher(i)\nFin Pour</pre><p><strong>Exercice 2:</strong></p><pre>somme ← 0\nPour i de 1 à 100 faire\n  somme ← somme + i\nFin Pour\nAfficher(somme)</pre>',
     admin_user_id, loops_category_id, level_1_id, true),
    
    ('Série 2: Boucles While', 
     'Utilisation des boucles conditionnelles', 
     '<h2>Série 2: Boucles While</h2><p><strong>Problème:</strong> Deviner un nombre entre 1 et 100</p><h3>Exercice:</h3><p>Écrivez un algorithme qui permet à l''utilisateur de deviner un nombre mystère. Le programme donne des indices "trop grand" ou "trop petit".</p>',
     '<h2>Correction</h2><pre>nombre_mystere ← 42\ndevine ← 0\nTant que devine ≠ nombre_mystere faire\n  Lire(devine)\n  Si devine > nombre_mystere alors\n    Afficher("Trop grand")\n  Sinon si devine < nombre_mystere alors\n    Afficher("Trop petit")\n  Fin Si\nFin Tant que\nAfficher("Bravo!")</pre>',
     admin_user_id, loops_category_id, level_2_id, true),
    
    -- Matrices activities
    ('Introduction aux Matrices', 
     'Représentation et manipulation des matrices', 
     '<h2>Les Matrices</h2><p>Une matrice est un tableau à deux dimensions.</p><h3>Exercice:</h3><p>Créez une matrice 3x3 et calculez la somme de tous ses éléments.</p><p>Matrice exemple:</p><pre>1 2 3\n4 5 6\n7 8 9</pre>',
     '<h2>Correction</h2><pre>matrice[3][3] ← {{1,2,3}, {4,5,6}, {7,8,9}}\nsomme ← 0\nPour i de 0 à 2 faire\n  Pour j de 0 à 2 faire\n    somme ← somme + matrice[i][j]\n  Fin Pour\nFin Pour\nAfficher(somme) // Résultat: 45</pre>',
     admin_user_id, matrices_category_id, level_2_id, true),
    
    ('Multiplication de Matrices', 
     'Algorithme de multiplication matricielle', 
     '<h2>Multiplication de Matrices</h2><p>Implémentez l''algorithme de multiplication de deux matrices 2x2.</p><h3>Matrices:</h3><p>A = [[1,2], [3,4]]</p><p>B = [[5,6], [7,8]]</p>',
     '<h2>Correction</h2><pre>Pour i de 0 à 1 faire\n  Pour j de 0 à 1 faire\n    C[i][j] ← 0\n    Pour k de 0 à 1 faire\n      C[i][j] ← C[i][j] + A[i][k] * B[k][j]\n    Fin Pour\n  Fin Pour\nFin Pour\n// Résultat: C = [[19,22], [43,50]]</pre>',
     admin_user_id, matrices_category_id, level_3_id, true),
    
    -- Sorting algorithms
    ('Tri à Bulles (Bubble Sort)', 
     'Algorithme de tri par comparaisons successives', 
     '<h2>Tri à Bulles</h2><p>Implémentez l''algorithme de tri à bulles pour trier le tableau: [64, 34, 25, 12, 22, 11, 90]</p><h3>Principe:</h3><p>Comparer les éléments adjacents et les échanger si nécessaire.</p>',
     '<h2>Correction</h2><pre>Pour i de 0 à n-2 faire\n  Pour j de 0 à n-i-2 faire\n    Si tableau[j] > tableau[j+1] alors\n      temp ← tableau[j]\n      tableau[j] ← tableau[j+1]\n      tableau[j+1] ← temp\n    Fin Si\n  Fin Pour\nFin Pour</pre>',
     admin_user_id, sorting_category_id, level_2_id, true),
    
    ('Tri Rapide (Quick Sort)', 
     'Algorithme de tri par division', 
     '<h2>Tri Rapide (Quick Sort)</h2><p>Implémentez l''algorithme de tri rapide. Expliquez le principe de la partition.</p><h3>Avantages:</h3><p>Complexité moyenne O(n log n)</p>',
     '<h2>Correction</h2><pre>Fonction tri_rapide(tableau, debut, fin)\n  Si debut < fin alors\n    pivot ← partition(tableau, debut, fin)\n    tri_rapide(tableau, debut, pivot-1)\n    tri_rapide(tableau, pivot+1, fin)\n  Fin Si\nFin Fonction</pre>',
     admin_user_id, sorting_category_id, bac_id, true),
    
    -- Recursion activities
    ('Factorielle Récursive', 
     'Calcul de factorielle avec récursivité', 
     '<h2>Factorielle Récursive</h2><p>Implémentez la fonction factorielle en utilisant la récursivité.</p><h3>Rappel:</h3><p>n! = n × (n-1)!</p><p>0! = 1</p>',
     '<h2>Correction</h2><pre>Fonction factorielle(n)\n  Si n = 0 ou n = 1 alors\n    Retourner 1\n  Sinon\n    Retourner n × factorielle(n-1)\n  Fin Si\nFin Fonction</pre>',
     admin_user_id, recursion_category_id, level_2_id, true),
    
    ('Suite de Fibonacci', 
     'Calcul récursif de Fibonacci', 
     '<h2>Suite de Fibonacci</h2><p>Implémentez la suite de Fibonacci de manière récursive.</p><p>F(0) = 0, F(1) = 1</p><p>F(n) = F(n-1) + F(n-2)</p>',
     '<h2>Correction</h2><pre>Fonction fibonacci(n)\n  Si n ≤ 1 alors\n    Retourner n\n  Sinon\n    Retourner fibonacci(n-1) + fibonacci(n-2)\n  Fin Si\nFin Fonction</pre>',
     admin_user_id, recursion_category_id, level_3_id, true),
    
    -- Data structures activities
    ('Piles (Stack)', 
     'Implémentation d''une pile', 
     '<h2>Structure de Données: Pile</h2><p>Implémentez les opérations push() et pop() pour une pile.</p><h3>Principe:</h3><p>LIFO - Last In, First Out</p>',
     '<h2>Correction</h2><pre>Classe Pile\n  tableau[MAX_SIZE]\n  sommet ← -1\n  \n  Fonction push(element)\n    Si sommet < MAX_SIZE-1 alors\n      sommet ← sommet + 1\n      tableau[sommet] ← element\n    Fin Si\n  \n  Fonction pop()\n    Si sommet ≥ 0 alors\n      element ← tableau[sommet]\n      sommet ← sommet - 1\n      Retourner element\n    Fin Si</pre>',
     admin_user_id, data_structures_category_id, level_3_id, true),
    
    -- Complexity activities
    ('Complexité Temporelle', 
     'Analyse de la complexité des algorithmes', 
     '<h2>Complexité Algorithmique</h2><p>Analysez la complexité temporelle de ces algorithmes:</p><ol><li>Recherche linéaire</li><li>Recherche binaire</li><li>Tri à bulles</li></ol>',
     '<h2>Correction</h2><ol><li><strong>Recherche linéaire:</strong> O(n)</li><li><strong>Recherche binaire:</strong> O(log n)</li><li><strong>Tri à bulles:</strong> O(n²)</li></ol>',
     admin_user_id, complexity_category_id, bac_id, true);

END $$;

-- 5. Verify the data was inserted correctly
SELECT 
    a.title,
    c.name as category,
    l.name as level,
    a.is_published
FROM public.activities a
LEFT JOIN public.categories c ON a.category_id = c.id
LEFT JOIN public.levels l ON a.level_id = l.id
ORDER BY c.name, l.name, a.title;
