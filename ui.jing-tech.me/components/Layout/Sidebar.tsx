import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { styled, theme } from '@jtui/theme';
import { Root, Header, Trigger, AccordionContent as Content, Item } from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
// import Header from '../../Typography/Headers';
import { useRouter } from 'next/router';

const StyledAccordionRoot = styled(Root, {
  backgroundColor: theme.colors['color-background-secondary-base'],
  '@sm': {
    marginBottom: '0',
  },
});

const Panel = styled('div', {
  paddingBottom: '$100',
  '@notSm': {
    position: 'fixed',
    height: '100%',
  },
  '@sm': {
    width: '100%',
  },
});

//Container
const Container = styled('div', {
  padding: '$100 0',
  overflowY: 'auto',
  height: '90%',
  backgroundColor: theme.colors['color-background-secondary-base'],
  // style the scrollbar
  '&::-webkit-scrollbar': {
    width: 'calc($087 / 2)',
    height: 'calc($087 / 2)',
    backgroundColor: theme.colors.gray400,
  },
  // style the scrollbar handle
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.gray200,
    borderRadius: '$round',
  },

  '@md': { marginTop: '0' },
  '@notSm': {
    width: '300px',
  },
  '@sm': {
    paddingBottom: 0,
  },
});

const AccordionHeader = styled(Header, {
  width: '100%',
  justifySelf: 'flex-start',
  marginBlock: 0,
  '@sm': {
    cursor: 'pointer',
  },
});

const RadixAccordionTrigger = React.forwardRef(({ children, className, ...props }: any, forwardedRef) => (
  <Trigger className={classNames('AccordionTrigger', className)} {...props} ref={forwardedRef}>
    {children}
    <ChevronDownIcon className="AccordionChevron" aria-hidden />
  </Trigger>
));

const AccordionTrigger = styled(RadixAccordionTrigger, {
  border: 'none',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  padding: '$300',
  textAlign: 'left',
  backgroundColor: theme.colors['color-background-secondary-base'],
});

const AccordionLabel = styled('span', {
  fontFamily: '$meta',
  paddingLeft: '$100',
  fontSize: '$200',
  fontWeight: '$semibold',
  color: theme.colors['color-text-default'],
  flex: 1,
});

const AccordionContent = styled(Content, {
  fontSize: '$300',
  color: theme.colors['color-text-default'],
});

const AccordionItem = styled(Item, {
  border: 'none',
});

//List in sidebars Accordion Content
const SideBarList = styled('ul', {
  listStyle: 'none',
  backgroundColor: theme.colors['color-background-secondary-base'],
  paddingLeft: '0px',
  marginBlock: '0',
});

const ListItem = styled('li', {
  color: '$primary',
  cursor: 'pointer',
  borderLeft: '4px solid',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.colors.gray400,
  },
  '&:focus': {
    outlineColor: '$signal',
    outlineStyle: 'solid',
    outlineWidth: '2px',
  },
  variants: {
    isCurrent: {
      active: {
        boxSizing: 'content-box',
        color: '$onSecondary',
        borderLeft: '4px solid',
        borderColor: '$primary',
        backgroundColor: '$gray400',
      },
    },
    disabled: {
      true: {
        cursor: 'default',
        pointerEvents: 'none',
        fontStyle: 'italic',
        marginBottom: '$025',
        backgroundColor: 'transparent',
      },
    },
  },
});

//Links in sidebar
const CustomLink = styled('a', {
  display: 'block',
  fontSize: '$200',
  color: 'inherit',
  textDecoration: 'none',
  width: '100%',
  borderLeft: '0 solid',
  marginLeft: '-4px',
  lineHeight: '12px',
  padding: '$200 $200 $200 $400',
  '&:focus': {
    outlineColor: '$signal',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    outlineWidth: '2px',
  },
  variants: {
    disabled: {
      true: {
        color: '$onDisabled',
      },
    },
  },
});

function Compare(a, b) {
  if (a.order < b.order || b.order == undefined) {
    return -1;
  }
  if (a.order > b.order || a.order == undefined) {
    return 1;
  }
  return 0;
}

export default function Sidebar({ navigation, setMobileMenu }) {
  const router = useRouter();

  const SortedList = ({ docs, setMobileMenu }) => {
    let sortedDocs = [];
    docs.map((item) => {
      sortedDocs.push({ order: item.data.order, frontMatter: item });
    });
    sortedDocs.sort(Compare);
    return (
      <>
        {sortedDocs.map((item, index) => {
          return (
            <ListItem
              onClick={() => setMobileMenu(false)}
              key={index}
              isCurrent={router.asPath.includes(item.frontMatter.slug) ? 'active' : ''}
              disabled={item.frontMatter.data.status === 'Coming soon'}
            >
              {item.frontMatter.data.status === 'Coming soon' ? (
                <CustomLink
                  as="div"
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  disabled
                >
                  <div>{item.frontMatter.data.title}</div>
                </CustomLink>
              ) : item.frontMatter.data.status == 'Draft' ? (
                <Link href={item.frontMatter.slug} passHref>
                  <CustomLink
                    css={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div>{item.frontMatter.data.title}</div>
                  </CustomLink>
                </Link>
              ) : (
                <Link href={item.frontMatter.slug} passHref>
                  <CustomLink>{item.frontMatter.data.title}</CustomLink>
                </Link>
              )}
            </ListItem>
          );
        })}
      </>
    );
  };
  return (
    <Panel id="open-nav">
      <Container id="sidebar-container">
        {navigation &&
          navigation.map((nav, index) => {
            return (
              <StyledAccordionRoot key={index} defaultValue={'Components'} type="single" collapsible>
                <AccordionItem value={nav.category}>
                  <AccordionHeader>
                    <AccordionTrigger density={'compact'}>
                      <AccordionLabel>{nav.category}</AccordionLabel>
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <SideBarList>
                      {nav.sortItems ? (
                        <SortedList setMobileMenu={setMobileMenu} docs={nav.docs} />
                      ) : (
                        <>
                          {nav.docs?.map?.((item, index) => {
                            return (
                              <ListItem
                                onClick={() => setMobileMenu(false)}
                                key={index}
                                isCurrent={router.asPath.includes(item.slug) ? 'active' : ''}
                                disabled={item.data.status === 'Coming soon'}
                              >
                                {item.data.status !== '' ? (
                                  <Link href={item.slug} passHref>
                                    <CustomLink
                                      css={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <div>{item.data.title}</div>
                                    </CustomLink>
                                  </Link>
                                ) : (
                                  <Link href={item.slug} passHref>
                                    <CustomLink>{item.data.title}</CustomLink>
                                  </Link>
                                )}
                              </ListItem>
                            );
                          })}
                        </>
                      )}
                    </SideBarList>
                  </AccordionContent>
                </AccordionItem>
              </StyledAccordionRoot>
            );
          })}
        <SideBarList css={{ '@notSm': { display: 'none' } }}>
          {/* <ListItem
            onClick={() => setMobileMenu(false)}
            isCurrent={router.asPath.includes('resources') ? 'active' : ''}
          >
            <Link href="/resources" passHref>
              <Header>
                <CustomLink css={{ color: '$primary' }}>Resources</CustomLink>
              </Header>
            </Link>
          </ListItem> */}
          {/* <ListItem
            onClick={() => setMobileMenu(false)}
            isCurrent={router.asPath.includes('release-notes') ? 'active' : ''}
          >
            <Link href="/release-notes" passHref>
              <Header>
                <CustomLink css={{ color: '$primary' }}>Release Notes</CustomLink>
              </Header>
            </Link>
          </ListItem> */}
        </SideBarList>
      </Container>
    </Panel>
  );
}
