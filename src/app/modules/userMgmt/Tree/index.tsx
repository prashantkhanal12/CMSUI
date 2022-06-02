import React, {useState} from 'react'
import {boolean} from 'yup/lib/locale'
import {FaAngleRight} from 'react-icons/fa'
import './tree.css'

const Tree = ({items = []}: any) => {
  return (
    <div className='d-tree'>
      <ul className='d-flex d-tree-container flex-column'>
        {items.map((tree: any) => (
          <TreeNode node={tree} />
        ))}
      </ul>
    </div>
  )
}

const TreeNode = ({node}: any) => {
  const [childVisible, setChildVisiblity] = useState(false)
  const hasChild = node.children ? true : false
  return (
    <li className='d-tree-node border-0'>
      <div className='d-flex' onClick={(e) => setChildVisiblity((v) => !v)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${childVisible ? 'active' : ''}`}
            style={{marginRight: '5px'}}
          >
            <FaAngleRight />
          </div>
        )}

        <div className='col d-tree-head'>
          <span>
            <input type='checkbox' className='d-inline align-middle' />{' '}
          </span>
          <span style={{marginLeft: '5px'}}> {node.label}</span>
        </div>
      </div>

      {hasChild && childVisible && (
        <div className='d-tree-content'>
          <ul className='d-flex d-tree-container flex-column' style={{marginLeft:'5px'}}>
            <Tree items={node.children} />
          </ul>
        </div>
      )}
    </li>
  )
}

export default Tree
