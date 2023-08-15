const NavTitle = ({icon, title, path}) => {
    const iconStyle = {
        marginRight: "10px"
    };

    return (
        <div className="nav-title">
            <h1>
                <span style={iconStyle}>{icon}</span>
                {title}
            </h1>
            <div className="path">
                <nav>
                    <ol className="breadcrumb">
                        {
                            path.map((item, index) => {
                                return (
                                    <li className="breadcrumb-item" key={index}>
                                        <a href={item.link}>{item.name}</a>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>
            </div>
        </div>
    )
}


export default NavTitle
