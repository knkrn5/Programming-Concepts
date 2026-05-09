# Operating System Package Managers

> Package managers don't go through any special kernel syscall. They're just userspace programs — they download files, extract archives, copy them to paths, maybe run scripts. All of that is just regular file + network syscalls. The kernel doesn't care.