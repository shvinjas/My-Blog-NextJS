import { Schema, model, models } from "mongoose"; 

const postSchema =  new Schema({
    title: String,
    description: String,
    image: String,
    created_at:String
}, { toJSON: { virtuals: true} });

postSchema.virtual('short_description').get(function() {
    return this.description.substr(0,100)+'...'
});
postSchema.virtual('created_at_formatted').get(function() {
    return changeDateFormat(this.created_at)

});

// function changeDateFormat(date_str) {
//     const date = new Date(date_str);
//     const months = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//     ];

//     return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
// }

function changeDateFormat(date_str) {
    // Split the date string into parts
    const [day, month, year] = date_str.split('-').map(Number);
    // Create a new date object with the parts rearranged into the "YYYY-MM-DD" format
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    // Define the month names
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Format the date
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}


const PostModel = models.Post || model('Post', postSchema);

export default PostModel;