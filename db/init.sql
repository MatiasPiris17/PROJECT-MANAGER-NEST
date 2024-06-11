SELECT 'CREATE DATABASE admproyectosdb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'admproyectosdb')\gexec