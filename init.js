db.createUser({
  user: "yuda01",
  pwd: "yuda01",
  roles: [
    {
      role: "readWrite",
      db: "yuda01",
    },
  ],
});

// db.createUser({user:"yuda01",pwd:"yuda01",roles:[{role:"readWrite",db:"yuda01"}]})
