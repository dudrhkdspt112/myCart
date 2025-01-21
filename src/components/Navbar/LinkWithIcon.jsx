import React from 'react'
import './LinkWithIcon.css';
import { NavLink } from 'react-router-dom';

const LinkWithIcon = ({title, link, emoji}) => {
  return (
    //네브링크는 자동으로 액티브 클래스가 추가됨(네브바에서 사용)
    <NavLink to={link} className='align_center'>
		{title} <img src={emoji} alt='' className='link_emoji' />
	</NavLink>
  )
}

export default LinkWithIcon