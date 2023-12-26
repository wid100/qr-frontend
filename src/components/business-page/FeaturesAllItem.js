import { useState } from "react"

const FeaturesAllItem = ({ selectedItem, handleItemClick, featuresData }) => {
    const [selectedColor, setSelectedColor] = useState('#ff0000')
    return (
        <>
            <div className="row mt-4">
                <div className="col-md-2">
                    <div className="info-form-label">
                        <p>Features:</p>
                    </div>
                </div>
                <div className="col-md-10">
                    <p>
                        Choose amenities available at your venue. Recommended
                        for gastronomy and retail.
                    </p>

                    <div className="all-features-item">
                        {featuresData.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleItemClick(index)}
                                className={
                                    Array.isArray(selectedItem) &&
                                    selectedItem.includes(index)
                                        ? 'selected'
                                        : ''
                                }>
                                <img
                                    src={item}
                                    alt=""
                                    style={{ fill: selectedColor }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturesAllItem
