import { Progress } from "@/components/ui/progress";

export default function CommentsStats({ comments }: { comments: commentType[] }) {
    const stats = Array(5).fill(null).map((_, i) => comments.filter((comment) => comment.stars === i + 1).length)
    return <div className="m6-2">
        <div className="flex gap-6 items-center my-2">
            <div className="w-full flex flex-col gap-1.5">
                {stats.reverse().map((stat, index) => <div key={index} className="flex gap-2"><h3>{5 - index}</h3><Progress max={comments.length > 0 ? comments.length : 1} value={stat} /></div>)}
            </div>
        </div>
    </div>;
}
