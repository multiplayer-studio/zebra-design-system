import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    height: fit-content;
    --progress-circle-color: var(--border-info);
  }
  .cancel zeta-icon {
    --icon-size: 20px;
    --icon-color: var(--foreground-primary);
  }

  svg.loading {
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    animation: rotation 1s linear infinite;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .percentage {
    font: var(--label-small);
    color: var(--foreground-primary);
  }

  .cancel {
    display: none;
    justify-content: center;
    align-items: center;
    background-color: var(--interactive-neutral-background-hover);
    border-radius: var(--radius-pill);
    cursor: pointer;
  }

  .uploading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .uploading:hover {
      .percentage {
        display: none;
      }

      .cancel {
        display: flex;
      }
    }
  }
`;
