import { useState } from "react";
import { Plus, LogOut, User } from "lucide-react";

interface SidebarProps {
    onNavClick: (nav: string) => void;
}

export default function Sidebar({ onNavClick }: SidebarProps) {
    const [expanded, setExpanded] = useState(false);

    const items = [
        { label: "Profile", icon: User },
        { label: "Generate a podcast", icon: Plus },
        { label: "Log out", icon: LogOut },
    ];

    return (
        <div
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className={`absolute top-0 left-0 h-screen overflow-y-hidden border-r border-gray-700 duration-300 ${expanded ? "w-56" : "w-16"}`}
        >
            <div className="mt-4 h-full space-y-4">
                {items.map((item) => (
                    <div
                        key={item.label}
                        onClick={() => onNavClick(item.label)}
                        className="mx-2 flex items-center space-x-2 rounded-sm hover:bg-gray-700"
                    >
                        <item.icon size={20} className="m-2" />
                        <span
                            className={`truncate text-sm duration-300 ${expanded ? "" : "hidden"}`}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ${expanded ? "w-56" : "w-16"}
${expanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
*/
