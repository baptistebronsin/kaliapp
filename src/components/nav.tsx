import Link from "next/link";

interface NavProps {
    title: string
    links: {
        label: string;
        redirection: string;
    }[]
    selectedLink?: string
}

const Navigation: React.FC<NavProps> = ({ title, links, selectedLink }) => {
    return (
        <nav className="flex flex-row justify-between items-center px-4 py-2">
            <a href="/" className="text-lg">{ title }</a>
            <div className="flex flex-row gap-6">
                {
                    links.map((link, index) => (
                        <Link key={index} href={link.redirection} style={selectedLink === link.label ? { color: 'red' } : {} } >{link.label}</Link>
                    ))
                }
            </div>
        </nav>
    )
}

export default Navigation