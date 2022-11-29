import { useEffect, useState } from 'react';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsArrowBarLeft, BsArrowBarRight } from "../assets/icons/icons"
import { Tooltip } from 'antd';
import "../css/pagination.css"


export default function Pagination({ page, setSearchParams }) {
    const currentpage = Number(page)
    let [isActive, setIsActive] = useState({
        firstBoxRef: false,
        secondBoxRef: false,
        thirdBoxRef: false,
        fourthBoxRef: false,
        fifthBoxRef: false
    })
    const checkIsActive = (page) => {
        let firstBoxRef = document.getElementById("firstBox").innerText === page;
        let secondBoxRef = document.getElementById("secondBox").innerText === page;
        let thirdBoxRef = document.getElementById("thirdBox").innerText === page;
        let fourthBoxRef = document.getElementById("fourthBox").innerText === page;
        let fifthBoxRef = document.getElementById("fifthBox").innerText === page;
        setIsActive({
            firstBoxRef,
            secondBoxRef,
            thirdBoxRef,
            fourthBoxRef,
            fifthBoxRef
        })

    }
    useEffect(() => {
        checkIsActive(page)
    }, [page])
    // className={firstBoxRef.current.innerText && Number(firstBoxRef.current.innerText) === page ? "btn btn-danger":"btn btn-outline-danger"}
    return (
        <div className='container d-flex align-items-center justify-content-center my-5'>

            <button className="border-0 fs-3 pagination-button" disabled={page <= 1} onClick={() => setSearchParams({ page: `${currentpage - 1}` })}>
                <Tooltip title="prev">
                    <BsFillArrowLeftCircleFill />
                </Tooltip>
            </button>

            <button className="border-0 fs-3 pagination-button" disabled={page <= 1} onClick={() => setSearchParams({ page: 1 })}>
                <Tooltip title="First Page">
                    <BsArrowBarLeft />
                </Tooltip>
            </button>

            <button id='firstBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage}` }) : setSearchParams({ page: 496 })} className={isActive.firstBoxRef ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1"} >{currentpage > 496 ? 496 : currentpage}</button>
            <button id='secondBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 1}` }) : setSearchParams({ page: 497 })} className={isActive.secondBoxRef ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1"}>{currentpage > 496 ? 497 : currentpage + 1}</button>
            <button id='thirdBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 2}` }) : setSearchParams({ page: 498 })} className={isActive.thirdBoxRef ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1"}>{currentpage > 496 ? 498 : currentpage + 2}</button>
            <button id='fourthBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 3}` }) : setSearchParams({ page: 499 })} className={isActive.fourthBoxRef ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1"}>{currentpage > 496 ? 499 : currentpage + 3}</button>
            <button id='fifthBox' onClick={() => currentpage < 496 ? setSearchParams({ page: `${currentpage + 4}` }) : setSearchParams({ page: 500 })} className={isActive.fifthBoxRef ? "btn btn-primary mx-1" : "btn btn-outline-primary mx-1"}>{currentpage > 496 ? 500 : currentpage + 4}</button>

            <button className="border-0 fs-3 pagination-button" disabled={page >= 500} onClick={() => setSearchParams({ page: 500 })}>
                <Tooltip title="Last Page">
                    <BsArrowBarRight />
                </Tooltip>
            </button>

            <button className="border-0 fs-3 pagination-button" disabled={page >= 500} onClick={() => setSearchParams({ page: `${currentpage + 1}` })}>
                <Tooltip title="next">
                    <BsFillArrowRightCircleFill />
                </Tooltip>
            </button>
        </div>
    )
}




