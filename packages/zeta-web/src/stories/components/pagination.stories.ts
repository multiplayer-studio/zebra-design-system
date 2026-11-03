import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPagination } from "../../components/pagination/pagination.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";
const spread = spreadGenerator(ZetaPagination);

type PaginationStory = ZetaPagination & { onpagechange: () => void };
const meta: Meta<PaginationStory> = {
  component: "zeta-pagination",
  tags: ["autodocs"],
  title: "Components/Pagination",
  args: {
    rounded: false,
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1,
    showControls: true,
    showMore: true,
    outline: false,
    onpagechange: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4489-1925"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Pagination: StoryObj<PaginationStory> = {
  render: ({ onpagechange, ...args }) => html`<zeta-pagination @page-change=${onpagechange} ${spread(args)}></zeta-pagination>`
};
