import styled from 'styled-components';

interface SvgProps {
  size?: number;
  fill?: string;
}

const StyledSvg = styled.svg<SvgProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  fill: ${({ fill }) => fill};
`;

const SvgComponent = ({ children, size, fill }: SvgProps & { children: React.ReactNode }) => {
  return (
    <StyledSvg size={size} fill={fill}>
      {children}
    </StyledSvg>
  );
};

export default SvgComponent;
