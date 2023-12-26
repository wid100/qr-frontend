import React from 'react'

const FeaturesAllItemPreview = ({selectedItem,featuresData}) => {
  return (
      <>
          {/* Render the preview of the selected item */}
          {selectedItem.length > 0 && (
              <div className="previews">
                  {selectedItem.map((selectedIndex, previewIndex) => (
                      <div key={previewIndex} className="preview">
                          <img
                              src={featuresData[selectedIndex]}
                              alt={`Selected Feature ${previewIndex + 1}`}
                          />
                          {/* Additional details or content for the selected feature can be added here */}
                      </div>
                  ))}
              </div>
          )}
      </>
  )
}

export default FeaturesAllItemPreview