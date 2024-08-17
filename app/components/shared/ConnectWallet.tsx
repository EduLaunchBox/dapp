"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoMdInformationCircle } from "react-icons/io";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";

export const ConnectWallet = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated");
                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="w-full"
                                    >
                                        {children}
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button
                                        onClick={openChainModal}
                                        type="button"
                                        className="text-error-400 text-xs lg:text-sm flex items-center justify-center space-x-2 whitespace-nowrap border w-full border-error-400 rounded-lg md:px-4 lg:py-3 p-2 md:py-[0.6875rem] bg-eerie-black-3"
                                    >
                                        <IoMdInformationCircle size={16} />
                                        <span>Wrong network</span>
                                    </button>
                                );
                            }
                            return (
                                <div
                                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                                    className="bg-secondary/700 text-grey/50  flex justify-center w-full max-md:text-[0.875rem] p-2 rounded-lg font-semibold"
                                >
                                    <button
                                        onClick={openChainModal}
                                        style={{
                                            display: chain.hasIcon ? "flex" : "none",
                                            alignItems: "center",
                                        }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 26,
                                                    height: 26,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        width={26}
                                                        height={26}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[6rem]"
                                    >
                                        {account.displayName}
                                    </button>
                                    <span>
                                        <MdKeyboardArrowDown size={18} />
                                    </span>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
