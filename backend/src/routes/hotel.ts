import { Request, Response, Router } from "express"
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/type";

const router = Router();

router.get("/search", async(req:Request,res:Response)=>{
  try{
    const query = constructSearchQuery(req.query)
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments(query);

    const response : HotelSearchResponse = {
      data:hotels,
      pagination: {
        total,
        page:pageNumber,
        pages: Math.ceil(total/pageSize)
      }
    }
    res.json(response)

  }catch(e){
    console.log("Error",e)
    res.status(500).json({message:"Something Went Wrong"});
  }
})

const constructSearchQuery = (queryParams:any)=>{

}
