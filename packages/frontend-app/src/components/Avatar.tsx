import styled from "styled-components";

export function Avatar() {
  const AvatarWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-size: contain;
    overflow: hidden;
    border: 2px solid #fff;
    cursor: pointer;
    
    img {
      width: 100%;
      height: 100%;
    }
  `;

  return (
    <AvatarWrapper>
      <img src="https://avatars.githubusercontent.com/u/1000000?v=4" alt="avatar" />
    </AvatarWrapper>
  );
}
