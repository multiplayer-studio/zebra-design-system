/* EXPERIMENTAL entry point — import from "@zebra-design-system/react-baseui/experimental".
 *
 * Everything here has no Figma spec yet (@spec none) and sits outside the
 * package's SemVer promises: APIs can change or disappear in a minor release.
 * A component graduates to the main entry when its spec lands and its export
 * moves to src/index.ts in the same change. Nothing in src/index.ts may
 * re-export from here. */
export { MessageInput, MessageThumbnail, messageInputStrings } from "./components/message-input/MessageInput.js";
export { ChatMessage, ChatText, ChatMention, ChatFile, ChatImages, ChatCard, ChatAudio, ChatVideo, ChatChoices, ChatSources, ChatTyping, ChatDivider, ChatThread, ChatHeader, ChatImageViewer, chatActions, fileKindOf, useChatShape, CHAT_REACTIONS, } from "./components/chat/Chat.js";
