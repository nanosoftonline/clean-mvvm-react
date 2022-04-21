export default function List({ onClick, title, }) {
    return (
        <button style={{ height: 24 }} onClick={onClick}>{title}</button>
    );
}