import styled from 'styled-components';
import { motion } from 'framer-motion';
import { stringToHSL } from '@/src/utils';
import { Colors, breakpoints, borderRadius, spacing } from '@/src/constants';

export const StyledList = styled(motion.ol).attrs({
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.02
      }
    }
  },
  initial: 'hidden',
  animate: 'show'
})`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItemCard = styled(motion.li).attrs({
  layout: true,
  transition: { layout: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  variants: {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 }
  }
})<{ $participantName: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: ${Colors.cardBg};
  border: 1px solid ${Colors.border};
  border-radius: ${borderRadius.md}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    border-color: ${Colors.border};
  }

  @media (min-width: ${breakpoints.sm}) {
    padding: 16px 20px;
    gap: 16px;
  }
`;

export const Avatar = styled.span<{ $participantName: string }>`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $participantName }) => stringToHSL($participantName, 70, 65)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.98);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;

  @media (min-width: ${breakpoints.sm}) {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
`;

export const NameCell = styled.span`
  flex: 1;
  min-width: 0;
  font-weight: 600;
  font-size: 1rem;
  color: ${Colors.colorSecondary};
  letter-spacing: 0.02em;
  line-height: 1.3;

  @media (min-width: ${breakpoints.sm}) {
    font-size: 1.0625rem;
  }
`;

export const WinnerBadge = styled.span`
  flex-shrink: 0;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${Colors.colorPrimary};
  background: ${Colors.colorPrimary}18;
  padding: 4px 8px;
  border-radius: ${borderRadius.sm}px;
`;

export const SectionCard = styled(motion.div)`
  background: ${Colors.headerFooterBgSolid};
  border: 1px solid ${Colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.cardPadding};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;
