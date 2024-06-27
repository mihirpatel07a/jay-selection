import Query from "../model.js/query.model.js";


export const getAllQueries = async(req , res)=>{

    try{
        const queries = await Query.find();

        if(!queries)
          return res.status(404).json({success: false , message : "queries not found"});

        res.status(200).json(queries);
    }
    catch(error)
    {
        res.status(401).json({
            success : false, 
            message : "error occurs"
        })
    }

}

export const deleteQuery = async (req , res, next)=>{
    try{

        const query = await Query.findById(req.params.id);

        if(!query)
            return res.status(404).json({success: false , message : "queries not found"});

         
        await Query.findByIdAndDelete(req.params.id);

        res.status(200).json("query succesffuly deleted");
   }
   catch(error)
   {
    res.status(401).json({
        success : false, 
        message : error.message
    })
   }
}