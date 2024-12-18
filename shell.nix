let
  pkgs = import <nixpkgs> {};
in
  pkgs.mkShellNoCC {
    packages = with pkgs; [
      python3
      bun
    ];
  }
