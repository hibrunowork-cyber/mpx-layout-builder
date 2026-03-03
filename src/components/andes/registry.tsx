import { CanvasNode } from '@/types/canvas';
// ─── Atoms ────────────────────────────────────────────────────────────────────
import { AndesButton }       from './atoms/AndesButton';
import { AndesBadge }        from './atoms/AndesBadge';
import { AndesTypography }   from './atoms/AndesTypography';
import { AndesTag }          from './atoms/AndesTag';
import { AndesThumbnail }    from './atoms/AndesThumbnail';
import { AndesRadioButton }  from './atoms/AndesRadioButton';
import { AndesMoneyAmount }  from './atoms/AndesMoneyAmount';
// ─── Molecules ────────────────────────────────────────────────────────────────
import { AndesCheckbox }     from './molecules/AndesCheckbox';
import { AndesListRow }      from './molecules/AndesListRow';
import { AndesProgress }     from './molecules/AndesProgress';
import { AndesPagination }   from './molecules/AndesPagination';
import { AndesDropdown }     from './molecules/AndesDropdown';
import { AndesAmountField }  from './molecules/AndesAmountField';
import { AndesSwitch }       from './molecules/AndesSwitch';
import { AndesTextField }    from './molecules/AndesTextField';
import { AndesSearchBar }    from './molecules/AndesSearchBar';
import { AndesAccordion }    from './molecules/AndesAccordion';
// ─── Organisms ────────────────────────────────────────────────────────────────
import { AndesHeader }       from './organisms/AndesHeader';
import { AndesFixedFooter }  from './organisms/AndesFixedFooter';
import { AndesFrame }        from './organisms/AndesFrame';
import { AndesOnboarding }   from './organisms/AndesOnboarding';
import { AndesCard }         from './organisms/AndesCard';
import { AndesList }         from './organisms/AndesList';
import { AndesSnackbar }     from './organisms/AndesSnackbar';
import { AndesTabs }         from './organisms/AndesTabs';
import { AndesBottomSheet }  from './organisms/AndesBottomSheet';

type ComponentRenderer = (props: {
  node: CanvasNode;
  children?: React.ReactNode;
  isSelected?: boolean;
}) => React.ReactElement | null;

export const COMPONENT_REGISTRY: Record<string, ComponentRenderer> = {
  // Atoms
  button:          ({ node }) => <AndesButton      node={node} />,
  badge:           ({ node }) => <AndesBadge        node={node} />,
  typography:      ({ node }) => <AndesTypography   node={node} />,
  tag:             ({ node }) => <AndesTag           node={node} />,
  thumbnail:       ({ node }) => <AndesThumbnail     node={node} />,
  'radio-button':  ({ node }) => <AndesRadioButton   node={node} />,
  'money-amount':  ({ node }) => <AndesMoneyAmount   node={node} />,
  // Molecules
  checkbox:        ({ node }) => <AndesCheckbox      node={node} />,
  'list-row':      ({ node }) => <AndesListRow        node={node} />,
  progress:        ({ node }) => <AndesProgress       node={node} />,
  pagination:      ({ node }) => <AndesPagination     node={node} />,
  dropdown:        ({ node }) => <AndesDropdown        node={node} />,
  'amount-field':  ({ node }) => <AndesAmountField    node={node} />,
  switch:          ({ node }) => <AndesSwitch          node={node} />,
  textfield:       ({ node }) => <AndesTextField       node={node} />,
  searchbar:       ({ node }) => <AndesSearchBar       node={node} />,
  accordion:       ({ node, children }) => <AndesAccordion node={node}>{children}</AndesAccordion>,
  // Organisms
  frame:           ({ node, children }) => <AndesFrame node={node}>{children}</AndesFrame>,
  header:          ({ node }) => <AndesHeader         node={node} />,
  'fixed-footer':  ({ node }) => <AndesFixedFooter    node={node} />,
  onboarding:      ({ node }) => <AndesOnboarding     node={node} />,
  card:            ({ node, children, isSelected }) => <AndesCard node={node} isSelected={isSelected}>{children}</AndesCard>,
  list:            ({ node, children }) => <AndesList  node={node}>{children}</AndesList>,
  snackbar:        ({ node }) => <AndesSnackbar        node={node} />,
  tabs:            ({ node }) => <AndesTabs             node={node} />,
  'bottom-sheet':  ({ node, children }) => <AndesBottomSheet node={node}>{children}</AndesBottomSheet>,
};

export function renderAndesComponent(
  node: CanvasNode,
  children?: React.ReactNode,
  isSelected?: boolean
): React.ReactElement | null {
  const renderer = COMPONENT_REGISTRY[node.componentId];
  if (!renderer) return null;
  return renderer({ node, children, isSelected });
}
