#!/usr/bin/env python3

import os
import json

ec2_ip = os.getenv("EC2_IP")

inventory = {
    "ec2": {
        "hosts": [ec2_ip],
        "vars": {
            "ansible_user": "ec2-user",
        }
    },
    "_meta": {
        "hostvars": {}
    }
}

print(json.dumps(inventory))
