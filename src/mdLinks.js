const {
   isAbsoluteRoute,
   relativeToAbsolute,
   isValidRoute ,
    isFileInRoute, 
    readDirectory,
    isMarkdown,
    readFile,
    getLinks,
    validateLinks} = require('./index.js');

 
    const mdLinks = (path,options ={}) => {

    return new Promise((resolve,reject) =>{
        if (!isAbsoluteRoute(path)){ // Convertir ruta relativa a absoluta 
            path = relativeToAbsolute(path);
        }

        if (!isValidRoute(path)){
            reject('Ruta no valida');
        }

        if (isFileInRoute(path)) {
            if (isMarkdown(path) ) {
                // Verificar si es un archivo Markdown
            readFile(path) // Leer el archivo
            .then((content) => {
                //console.log(content);
                const links = getLinks(path, content); // Extraer los enlaces del contenido del archivo
                
                // if (options.validate) {
                validateLinks(links, options.validate) // Validar los enlaces encontrados
                .then((validatedLinks) => resolve(validatedLinks))
                .catch((error) => reject(error));

            })
            .catch((error) => reject(error));
            } else {
                reject();
            }

       } else {
            const files = readDirectory(path); // Leer el directorio y obtener los archivos Markdown
        //console.log(files);
            const promises = files.map((file) => { //realizo mapeo de los archivos y creo promesas
                return new Promise((resolve, reject) => {

                    readFile(file)
                    .then((content) => {
                        const links = getLinks(file, content); // Extraer los enlaces de cada archivo
                        
                        if (options.validate) {
                        validateLinks(links, options.validate) // Validar los enlaces
                        .then((validatedLinks) => resolve(validatedLinks))
                        .catch((error) => reject(error));
                } else {
                    resolve(links);
                }
                    })
                    .catch((error) => reject(error));
                }); 
            });
    
            Promise.all(promises)
            .then((results) => {
                const allLinks = results.flat(); // Aplanar el arreglo de enlaces de múltiples archivos
                    resolve(allLinks);
            })
            .catch((error) => reject(error));
        }
    });
};

module.exports = mdLinks;
mdLinks('mock-archivosDeEjemplo\\mock-natis93.md',{ validate: true})
 .then(links => {
    console.log(links);
 })
 .catch(error =>{
    console.error(error);
 }) ;