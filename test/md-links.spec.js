const mdLinks = require('../src/mdLinks');
const path = require('path');


describe('mdLinks', () => {
    it('debería retornar una promesa que se resuelve con un array de objetos de 5 atributos, si es unArchivo y si es true', (done) => {
        const route = 'mock-archivosDeEjemplo';
        const result = mdLinks(route, options = { validate: true });

        expect(result).resolves.toEqual([
            {
                href: 'https://github.com/natis93/DEV008-md-links.git',
                text: 'GitHub-natis93',
                file: 'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\mock-natis93.md',
                status: 200,
                ok: 'OK'
            },
            {
                href: 'https://nodejs.dev/learn/the-package-json-guide',
                text: 'Link roto desde Node',
                file:'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\mock-natis93.md',
                status: 404,
                ok: 'fail'
            },
            {
                href: 'https://www.goooogle.com/',
                text: 'Link mal escrito',
                file: 'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\mock-natis93.md',
                status: null,
                ok: 'fail'
            }
        ]).then(done); // Llama a "done" cuando la promesa se haya resuelto o rechazado
    });
   
    it('debería retornar una promesa que se resuelve con un array de objetos con 3 atrubutos, si es archivo y si es false', (done) => {
        const route = path.join ('mock-archivosDeEjemplo', 'mock-natis93.md');
        const result = mdLinks(route, options = { validate: false });

        expect(result).resolves.toEqual([
            {
                href: 'https://github.com/natis93/DEV008-md-links.git',
                text: 'GitHub-natis93',
                file: 'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\mock-natis93.md',
            },
            {
                href: 'https://nodejs.dev/learn/the-package-json-guide',
                text: 'Link roto desde Node',
                file:'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\mock-natis93.md',
            },
            {
                href: 'https://www.goooogle.com/',
                text: 'Link mal escrito',
                file:'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\mock-natis93.md',
            }
        ]).then(done); 
    });


    it('debería rechazar la promesa con el mensaje de error "Ruta no válida"', (done) => {
        const route = 'ruta/invalida';
        
        mdLinks(route)
        .catch((error) => {
            expect(error).toBe('Ruta no valida');
            done(); 
        });
    });


    
    it('debería rechazar la promesa si ocurre un error al leer el directorio', (done) => {
        const route ='C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock-archivosDeEjemplo\\subcarpeta';
        const options = { validate: true };
        
        mdLinks(route, options)
        .catch((error) => {
            expect(error).toBeDefined();
            done(); // Llama a "done" cuando la promesa se haya resuelto o rechazado
        });
    });


    it('Deberia retornar una promesa y extraer los links al leer un directorio', (done) => {
        const route = 'mock2';
        const result = mdLinks(route, options = { validate: false });

        expect(result).resolves.toEqual([
            {
                text: 'Acerca de Node.js - Documentación oficial',
                href: 'https://nodejs.org/es/about/',
                file: 'C:\\Users\\LENOVO\\OneDrive\\Documentos\\proyectos laboratoria\\DEV008-md-links\\mock2\\archivo.md'
            }
        ]).then(done); 
    });



});