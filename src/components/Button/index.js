import styled from 'styled-components';
import PropType from 'prop-types';

const Button = styled.button`
  margin: 20px 0;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #dadada;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.success};
  transition: .5s ease-out;
  width: 100%;
  height: 38px;
  outline: 0;
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.wrong};
    color: #DDDDDD;
  }
`;

Button.propTypes = {
  type: PropType.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropType.node.isRequired,
};

export default Button;
