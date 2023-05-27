import {useState} from "react";


const ItemMenu = ({children, title, icon}) => {
    const [open, setOpen] = useState(false);

    const handleSubMenu = () => {
        (open) ? setOpen(false) : setOpen(true);
    }


    return (
        <>
            <li className="item-menu subitem">
                <h3 className={(open === true) ? "link-menu aberto" : "link-menu"}
                    onClick={() => handleSubMenu()}>
                    <i className={icon}></i>
                    <span>{title}</span>
                </h3>

                <ul className={(open === true) ? 'item-menu sub aberto' : 'item-menu sub'}>
                    {children}
                </ul>
            </li>
        </>
    );

}
export default ItemMenu;
