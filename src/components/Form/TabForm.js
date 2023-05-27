import {useState} from "react";


const TabForm = ({tabs}) => {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="form-content">
                <nav>
                    <ul>
                        {
                            tabs.map((tab, index) => (
                                <li key={index} className={activeTab === index ? 'active' : ''}>
                                    <a href="#" onClick={() => setActiveTab(index)}>{tab.label}</a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="content">
                    {tabs[activeTab].content}
                </div>

                <div className="paginationButton">
                    <button className="btn btn-outline-secondary btn-sm"
                            onClick={() => setActiveTab(activeTab - 1)}
                            disabled={activeTab === 0}>
                        <i className="fa-solid fa-arrow-left ml-15px"></i>
                        Back
                    </button>
                    <button className="btn btn-outline-secondary btn-sm"
                            onClick={() => setActiveTab(activeTab + 1)}
                            disabled={activeTab === tabs.length - 1}>
                        Next
                        <i className="fa-solid fa-arrow-right mr-15px"></i>
                    </button>
                </div>
            </div>

        </>
    )
}

export default TabForm;
