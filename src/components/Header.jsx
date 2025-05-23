import '../styles/Header.css'
import 'boxicons/css/boxicons.min.css'
import { Link } from 'react-router-dom'
import RenderSearch from '../smallElems/search'
import { useState } from 'react'
function Header(){
    const [showSearch,setSearch]=useState(false)
    function enableSearch(){
        setSearch(true)
    }
    return(
    <div className={showSearch ? 'blur_overlay' : ''}>
        <header className={showSearch ? 'searching_header_toggled' :'simple_header'}>
            <span className='blur'></span>
            <div className={showSearch ? 'header_upperLine_searching' :'header_upper_line'}>
                {!showSearch && (
                <>
                
                <div className='headerNav'>
                    <Link to='/'>
                        <div className='Logo'>
                            <img src="https://solea-parent.dfs.ivi.ru/picture/f30745,ffffff/reposition_iviLogoPlateRounded.svg" alt="" />
                        </div>
                    </Link>
                    <div className='headerNavMenu'>
                        <ul className='headerNavMenu'>
                            <li className='header_Nav_Menu_Li'>Мой ИВИ</li>
                            <li className='header_Nav_Menu_Li'>Фильмы</li>
                            <li className='header_Nav_Menu_Li'>Сериалы</li>
                            <li className='header_Nav_Menu_Li'>Мультфильмы</li>
                            <li className='header_Nav_Menu_Li'>ТВ-каналы</li>
                        </ul>
                    </div>
                </div>
                <div className='headerFilterSection'>
                    <button className='headerSearch' onClick={enableSearch}>< i className=' bx bx-search'></i>Поиск</button>
                    <button className='LoginBtn'>Войти</button>
                </div>
                </>)}
                {showSearch && <RenderSearch/>}
            </div>
        </header>
    </div>
    )
}
export default Header
