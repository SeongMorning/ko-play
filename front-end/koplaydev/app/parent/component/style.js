import styled from 'styled-components';
import arrow from '.../rightArrow.png'

export const NextTo = styled.div`
    background-image: url(${arrow});
    background-size: contain;
    height: 20px;
    width: 20px;
`

export const Prev = styled.div`
    transform: rotate(180deg);
    background-image: url(${arrow});
    background-size: contain;
    height: 20px;
    width: 20px;
`

export const SliderContainer = styled.div`
    margin: 0px 200px;
    border: solid 1px black;
    .slick-prev:before,
    .slick-next:before {
        display: none;	
    }
`