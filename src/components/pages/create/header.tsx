import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className="p-3 h-[48px] flex items-center border-b border-border">
            <div className="flex-1 flex items-center justify-between text-sm">
                <div className="flex gap-3 items-center truncate">
                    <div className="flex items-center gap-2 px-2 hover:bg-accent p-1 rounded-sm cursor-pointer">
                        {/* {doc.iconImage && (
                                <Image
                                    height={24}
                                    width={24}
                                    alt="icon image"
                                    src={`${doc.iconImage.url}?timeStamp=${doc.iconImage.timeStamp}`}
                                    className="object-cover w-4 h-4 overflow-hidden shrink-0"
                                />
                            )} */}
                        <span className="truncate flex-1 overflow-hidden">
                            {"Untitled"}
                        </span>
                    </div>
                    <span>Saved</span>
                </div>
                {/* <div className="flex gap-2">
                        <Updated updatedAt={doc.updatedAt} />
                        <Share isShare={isShare} />
                </div> */}
            </div>
        </header>
    )
}

export default Header