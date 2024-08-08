import { useAppSelector } from "@/hooks";
import { Link } from "react-router-dom";
import { selectAllPosts } from "./postSlice";
import { TimeAgo } from "@/components/TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsList = () => {
    const posts = useAppSelector(selectAllPosts)
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>
                <Link to={`/posts/${post.id}`}> {post.title}</Link>
            </h3>
            <ReactionButtons post={post}/>
            <TimeAgo timestamp={post.date}></TimeAgo>
            <p className="post-content"> {post.content.substring(0, 100)}</p>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
