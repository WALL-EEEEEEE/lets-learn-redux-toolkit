import { useAppSelector } from "@/hooks"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { selectPostById } from "./postSlice"
import { TimeAgo } from "@/components/TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { selectCurrentUserName } from "../auth/authSlice"


export const SinglePostPage = () => {
    const { postId } = useParams()
    const post = useAppSelector(state => selectPostById(state, postId!))
    const currentUserName = useAppSelector(selectCurrentUserName)
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    const canEdit = currentUserName === post.user
    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                 <TimeAgo timestamp={post.date}></TimeAgo>
                 <ReactionButtons post={post}></ReactionButtons>
                <p className="post-content">
                    {post.content}
                </p>
                {canEdit && (
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
                )}
            </article>
        </section>
    )
}