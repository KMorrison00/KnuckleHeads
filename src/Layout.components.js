import styled from "styled-components";

export const CardLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Header = styled.header`
    width: 100%;
    text-align: center;
    background-color: green;
    font-size: 24px;
    font-weight: bold;
    color: whitesmoke;
    padding: 16px 0;
`;

export const PlayerCardGrid = styled.div `
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto
`;  