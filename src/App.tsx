import React from "react";
import { DataProvider, useData } from "./hooks/useData.tsx";

import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar.tsx";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/sidebar.tsx";

import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JudgesTable } from "@/components/JudgesTable.tsx";
import { JudgeCard } from "@/components/JudgeCard.tsx";

const App: React.FC = () => {
  const { currentPage } = useData();

  return (
    <DataProvider>
      <Layout>
        <div className={"flex-col flex"}>
          {currentPage === "home" && <JudgesTable />}
          {/* {currentPage === "about" && <AboutPage />} */}
        </div>
      </Layout>
    </DataProvider>
  );
};

function Layout({ children }: { children: React.ReactNode }) {
  const { selectedJudge, setSelectedJudge } = useData();

  const { setCurrentPage } = useData();

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem href="/search" aria-label="Search">
              <MagnifyingGlassIcon />
            </NavbarItem>
            <NavbarItem href="/inbox" aria-label="Inbox">
              <InboxIcon />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/profile-photo.jpg" square />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader></SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem onClick={() => setCurrentPage("home")}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem onClick={() => setCurrentPage("about")}>
                <QuestionMarkCircleIcon />
                <SidebarLabel>About</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
          </SidebarBody>
        </Sidebar>
      }
    >
      <div className="flex grow w-full">
        <div className={`flex-1 w-full ${selectedJudge ? "lg:flex" : ""}`}>
          <div
            className={`border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 ${
              selectedJudge
                ? "lg:w-1/2 xl:w-2/5 lg:shrink-0 lg:border-b-0 lg:border-r lg:pl-6"
                : "w-full"
            }`}
          >
            <div>{children}</div>
          </div>
          {selectedJudge && (
            <div className="px-4 py-6 sm:px-6 lg:pl-8 lg:flex-1 ">
              <div className="flex cursor-pointer ">
                <div className="flex flex-col w-full  space-y-4">
                  <div className="flex justify-end">
                    <XCircleIcon
                      className="hover:text-zinc-500 text-zinc-300 transition cursor-pointer"
                      onClick={() => setSelectedJudge(null)}
                      width={20}
                    />
                  </div>
                  <JudgeCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default App;
