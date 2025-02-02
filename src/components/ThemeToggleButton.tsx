import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { Colors } from '../constants';
import { useMediaQuery } from '@mantine/hooks';
import SvgComponent from './SvgComponent';
import { ColorScheme } from '@mantine/core';

type TooltipTextFormat = `Enable ${ColorScheme} theme`;

const ThemeToggleButton = ({ className }: { className?: string }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const tooltipText: TooltipTextFormat = `Enable ${colorScheme} theme`;

  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  const iconConfig = {
    ...(isDarkTheme
      ? {
          file: '/sun.svg',
          altText: 'Sun icon',
          fill: '#F4AB52FF'
        }
      : {
          file: '/moon.svg',
          altText: 'Moon icon',
          fill: Colors.colorSecondary
        }),
    size: isLargeScreen ? 28 : 32
  };
  const actionIconSize = iconConfig.size + 2; // 2px for padding

  const icons = {
    dark: (
      <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 2.75C17.586 2.75 17.25 2.414 17.25 2c0-.414.336-.75.75-.75h4c.304 0 .578.183.693.463.116.28.052.603-.163.817l-2.72 2.72H22c.414 0 .75.336.75.75s-.336.75-.75.75h-4c-.303 0-.577-.183-.693-.463-.116-.28-.052-.603.163-.817l2.72-2.72h-1.19zm-4.5 6c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3c.304 0 .578.183.693.463.116.28.052.603-.163.817l-1.72 1.72h1.19c.414 0 .75.336.75.75s-.336.75-.75.75h-3c-.303 0-.577-.183-.693-.463-.116-.28-.052-.603.163-.817l1.72-1.72h-1.19z"
        />
        <path d="M12 22c5.523 0 10-4.477 10-10 0-.463-.693-.539-.933-.143-1.138 1.884-3.205 3.143-5.567 3.143C11.91 15 9 12.09 9 8.5c0-2.362 1.26-4.429 3.143-5.567.396-.24.32-.933-.143-.933-5.523 0-10 4.477-10 10s4.477 10 10 10z" />
      </svg>
    ),
    light: (
      <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 12c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1.25c.414 0 .75.336.75.75V3c0 .414-.336.75-.75.75S11.25 3.414 11.25 3V2c0-.414.336-.75.75-.75zM4.399 4.399a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06L4.4 5.459a.75.75 0 0 1 0-1.06zm15.202 0a.75.75 0 0 1 0 1.06l-.392.393a.75.75 0 1 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0zM1.25 12c0-.414.336-.75.75-.75h1c.414 0 .75.336.75.75s-.336.75-.75.75h-1a.75.75 0 0 1-.75-.75zm19 0c0-.414.336-.75.75-.75h1c.414 0 .75.336.75.75s-.336.75-.75.75h-1a.75.75 0 0 1-.75-.75zm-1.853 6.147a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06zM5.852 18.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06zm6.148 2.102c.414 0 .75.336.75.75v1c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1c0-.414.336-.75.75-.75z"
        />
      </svg>
    )
  };

  return (
    <Tooltip label={tooltipText}>
      <ActionIcon
        variant="transparent"
        className={className}
        size={actionIconSize}
        onClick={() => toggleColorScheme()}
      >
        <SvgComponent size={iconConfig.size} fill={iconConfig.fill}>
          {icons[colorScheme]}
        </SvgComponent>
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggleButton;
