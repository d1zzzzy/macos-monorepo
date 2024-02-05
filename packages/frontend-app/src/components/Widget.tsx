import styled from 'styled-components';

export interface WidgetProps {

}

export function Widget() {
  const PositionedElement = styled.section`
    position: absolute;
  `;

  return (
    <div>
      Widget
    </div>
  )
}
