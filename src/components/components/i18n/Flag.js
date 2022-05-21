import React from 'react'

const Flag = ({ label, isSelected, ...props }) => (
  <div>
    <span alt="flag" className={isSelected ? 'flag selected' : 'flag'} {...props}>
      {label}
    </span>
  </div>
)

export default Flag
