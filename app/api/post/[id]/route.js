
import PostModel from "@/models/postModel";
import connectMongo from "@/utils/connectMongo";

export async function GET(req, {params}) {
    try {
        console.log(params);
        await connectMongo();
        const postData = await PostModel.findOne({_id: params.id });
        return Response.json(postData);
    } catch (error) {
        return Response.json({message: error.message })
    }
   
}