-- Make khalilhorri9@gmail.com an admin
-- Run this AFTER the user creates an account through the app

-- Method 1: Update existing user to admin (if record exists)
UPDATE public.students 
SET is_admin = true, updated_at = NOW()
WHERE email = 'khalilhorri9@gmail.com';

-- Method 2: If no record was updated, create the record with the correct user ID from auth.users
DO $$
DECLARE
    user_id_var UUID;
    affected_rows INTEGER;
BEGIN
    -- Check how many rows were affected by the update
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    
    IF affected_rows = 0 THEN
        -- Get the actual user ID from auth.users table
        SELECT id INTO user_id_var 
        FROM auth.users 
        WHERE email = 'khalilhorri9@gmail.com';
        
        IF user_id_var IS NOT NULL THEN
            -- Insert with the correct ID from auth.users
            INSERT INTO public.students (id, email, full_name, is_admin, created_at, updated_at)
            VALUES (
                user_id_var,
                'khalilhorri9@gmail.com',
                'Khalil Horri',
                true,
                NOW(),
                NOW()
            )
            ON CONFLICT (id) DO UPDATE SET
                is_admin = true,
                email = 'khalilhorri9@gmail.com',
                updated_at = NOW();
                
            RAISE NOTICE 'Created/updated admin record for khalilhorri9@gmail.com with ID %', user_id_var;
        ELSE
            RAISE NOTICE 'User khalilhorri9@gmail.com not found in auth.users table';
        END IF;
    ELSE
        RAISE NOTICE 'Updated % existing records', affected_rows;
    END IF;
END $$;

-- Verify the update worked
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM public.students 
WHERE email = 'khalilhorri9@gmail.com';

-- Also show the user from auth.users for comparison
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users 
WHERE email = 'khalilhorri9@gmail.com';
