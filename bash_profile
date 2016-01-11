alias ll='ls -la'
alias lr='ls -R'
alias ty='echo "You are welcome!"'
alias atom='open -a Atom'
alias sublime='open -a Sublime\ Text'
alias s='sublime'
alias gco='git checkout'
alias gst='git status' 
alias gcm='git commit'
alias glg='git log'
alias grb='git rebase'
alias gpl='git pull'
alias gps='git push'
alias gad='git add'
alias gcp='git cherry-pick'
alias gmg='git merge'
alias gdi='git diff'

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
[[ -f "$HOME/.functions" ]] && source "$HOME/.functions"  

if [ ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi

function colours
{
  local RED="\[\033[1;31m\]"
  local GREEN="\[\033[1;32m\]"
  local BLUE="\[\033[1;34m\]"
  local GREY="\[\033[0;37m\]"
  local LIGHT_GREY="\[\033[1;37m\]"
  local NO_COLOUR="\[\033[0m\]"

PS1="
$GREEN \u\
$GREY \$(date +%d/%b/%y)\
$LIGHT_GREY \$(date +%H:%M)\
$BLUE \w\
$RED (\$(git branch 2>/dev/null | grep '^*' | colrm 1 2))\
$NO_COLOUR $ "

}
colours

cd code

export PATH=/usr/local/sbin:$PATH

PATH=/opt/local/bin:$PATH
source ~/.profile
