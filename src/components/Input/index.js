import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #dadada;
  outline: 0;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.contrastText};
  ::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

export default function Input({
  onChange, placeholder, value, name,
}) {
  return (
    <div>
      <InputBase
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
};
