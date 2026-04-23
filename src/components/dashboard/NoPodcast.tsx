interface NoPodcastProps {
    isShowButton: boolean,
    onClick: () => void
}

export default function NoPodcast({ isShowButton, onClick }: NoPodcastProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 py-10">
            <h2 className="text-xl mb-4">No Podcast yet</h2>
            {isShowButton && (
                <div className="flex bg-primary p-4 border-gray-400 rounded-xl cursor-pointer hover:border" onClick={onClick}>
                    <p>Generate your new podcast</p>
                </div>
            )}
        </div>
    );
}