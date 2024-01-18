const Projects = require('./projects-model');

function logger(req, res, next) {
    // DO YOUR MAGIC
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );
  
    next();
  };

  async function validateProjectId(req, res, next) {
    try{
    const project = await Projects.get(req.params.id);
        if(!project){
            res.status(404).json({ message: 'no project with given id' })
        }else{
            req.project = project;
            next();
        }
    }catch(err){
        res.status(500).json({message: 'project is bad'})
    } 
  }


  module.exports = {
    logger,
    validateProjectId,
  }