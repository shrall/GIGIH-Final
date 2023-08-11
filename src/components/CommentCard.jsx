function CommentCard({ comment }) {
  return (
    <div className="p-2 mb-2 border-2 border-white rounded-lg flex flex-col gap-1">
      <div className="font-bold">
        {comment.username} - {new Date(comment.createdAt).toLocaleString()}
      </div>
      <div>{comment.comment}</div>
    </div>
  );
}

export default CommentCard;
