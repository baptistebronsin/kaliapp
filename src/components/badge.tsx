interface BadgeProps {
    value: string;
    borderColor: string;
    backgroundColor: string;
    size: 'small' | 'medium' | 'large';
    onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ value, borderColor, backgroundColor, size, onClick }) => {
    const sizeClasses = {
        small: 'text-xs py-1 px-2',
        medium: 'text-sm py-1 px-3',
        large: 'text-base py-1 px-3',
    };
    const Element = onClick ? 'button' : 'p';

    return (
        <Element className={`inline-block rounded-lg border ${sizeClasses[size]}`} style={{ borderColor, backgroundColor }} onClick={onClick}>
            {value}
        </Element>
    )
}

export default Badge;